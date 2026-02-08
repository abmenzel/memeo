const BASE_URL = process.env.NEXT_PUBLIC_API_URL

type ApiError = {
  status: number
  message: string
  details: unknown | null
}

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError }

const isJsonResponse = (res: Response): boolean =>
  (res.headers.get('content-type') ?? '').includes('application/json')

const safeParseJson = async (res: Response): Promise<unknown | null> => {
  if (!isJsonResponse(res)) return null
  try {
    return await res.json()
  } catch {
    return null
  }
}

export const apiFetch = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<ApiResult<T>> => {
  const url = new URL(path, BASE_URL).toString()

  const res = await fetch(url, {
    ...init,
    headers: {
      accept: 'application/json',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
      ...(init.headers ?? {}),
    },
  })

  const body = await safeParseJson(res)

  if (!res.ok) {
    const message =
      (body && typeof body === 'object' && 'message' in body && typeof (body as any).message === 'string'
        ? (body as any).message
        : res.statusText) || 'Request failed'

    return {
      ok: false,
      error: { status: res.status, message, details: body },
    }
  }

  return { ok: true, data: body as T }
}
