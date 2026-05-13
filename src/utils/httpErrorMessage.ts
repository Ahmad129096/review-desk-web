import { isAxiosError } from "axios";

function normalizeMessageField(raw: unknown): string | undefined {
  if (raw == null) return undefined;
  if (typeof raw === "string") {
    const t = raw.trim();
    return t || undefined;
  }
  if (Array.isArray(raw)) {
    const parts = raw
      .filter((x): x is string => typeof x === "string" && x.trim().length > 0)
      .map((x) => x.trim());
    if (parts.length) return parts.join(" ");
  }
  return undefined;
}

function extractMessageFromResponseBody(data: unknown): string | undefined {
  if (data == null) return undefined;
  if (typeof data === "string") {
    const t = data.trim();
    return t || undefined;
  }
  if (typeof data !== "object") return undefined;

  const o = data as Record<string, unknown>;

  const fromMessage = normalizeMessageField(o.message);
  if (fromMessage) return fromMessage;

  if (typeof o.detail === "string" && o.detail.trim()) return o.detail.trim();

  const fromErrorField = normalizeMessageField(o.error);
  if (
    fromErrorField &&
    !/^bad request$/i.test(fromErrorField) &&
    !/^unauthorized$/i.test(fromErrorField)
  ) {
    return fromErrorField;
  }

  const nested = o.data;
  if (nested && typeof nested === "object") {
    const inner = nested as Record<string, unknown>;
    const nestedMsg = normalizeMessageField(inner.message);
    if (nestedMsg) return nestedMsg;
  }

  return undefined;
}

/** Prefer server JSON message over Axios "Request failed with status code 400". */
export function getHttpErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const fromBody = extractMessageFromResponseBody(error.response?.data);
    if (fromBody) return fromBody;
  }
  if (error instanceof Error) {
    const m = error.message?.trim();
    if (m && !/^Request failed with status code \d+$/i.test(m)) return m;
  }
  return fallback;
}
