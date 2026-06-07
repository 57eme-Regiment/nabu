export declare const wanAdminUserApi: {
    search: (args?: {
        cache?: RequestCache | undefined;
        fetchOptions?: import("@ts-rest/core").FetchOptions | undefined;
        extraHeaders?: Record<string, string> | undefined;
        overrideClientOptions?: Partial<import("@ts-rest/core").OverrideableClientArgs> | undefined;
        query?: {
            search?: string | undefined;
            limit?: unknown;
        } | undefined;
    } | undefined) => Promise<{
        status: 200;
        body: {
            id: string;
            name: string;
            isSuperAdmin: boolean;
            image?: string | null | undefined;
            disabledAt?: Date | null | undefined;
            disabledReason?: string | null | undefined;
        }[];
        headers: Headers;
    } | {
        status: 401;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 403;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 204 | 404 | 409 | 100 | 101 | 102 | 201 | 202 | 203 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 402 | 405 | 406 | 407 | 408 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
        body: unknown;
        headers: Headers;
    }>;
    getAll: (args?: {
        cache?: RequestCache | undefined;
        fetchOptions?: import("@ts-rest/core").FetchOptions | undefined;
        extraHeaders?: Record<string, string> | undefined;
        overrideClientOptions?: Partial<import("@ts-rest/core").OverrideableClientArgs> | undefined;
    } | undefined) => Promise<{
        status: 200;
        body: {
            id: string;
            name: string;
            isSuperAdmin: boolean;
            image?: string | null | undefined;
            disabledAt?: Date | null | undefined;
            disabledReason?: string | null | undefined;
            sessions?: {
                id: string;
                userId: string;
                expiresAt: Date;
                createdAt: Date;
                ipAddress: string | null;
                userAgent: string | null;
            }[] | null | undefined;
        }[];
        headers: Headers;
    } | {
        status: 401;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 403;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 204 | 404 | 409 | 100 | 101 | 102 | 201 | 202 | 203 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 402 | 405 | 406 | 407 | 408 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
        body: unknown;
        headers: Headers;
    }>;
    disableUser: (args: {
        cache?: RequestCache | undefined;
        params: {
            userId: string;
        };
        fetchOptions?: import("@ts-rest/core").FetchOptions | undefined;
        extraHeaders?: Record<string, string> | undefined;
        overrideClientOptions?: Partial<import("@ts-rest/core").OverrideableClientArgs> | undefined;
        body?: {
            reason?: string | undefined;
        } | undefined;
    }) => Promise<{
        status: 401;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 403;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 204;
        body: null;
        headers: Headers;
    } | {
        status: 404;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 409;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 200 | 100 | 101 | 102 | 201 | 202 | 203 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 402 | 405 | 406 | 407 | 408 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
        body: unknown;
        headers: Headers;
    }>;
    enableUser: (args: {
        cache?: RequestCache | undefined;
        params: {
            userId: string;
        };
        fetchOptions?: import("@ts-rest/core").FetchOptions | undefined;
        extraHeaders?: Record<string, string> | undefined;
        overrideClientOptions?: Partial<import("@ts-rest/core").OverrideableClientArgs> | undefined;
    }) => Promise<{
        status: 401;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 403;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 204;
        body: null;
        headers: Headers;
    } | {
        status: 404;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 409;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 200 | 100 | 101 | 102 | 201 | 202 | 203 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 402 | 405 | 406 | 407 | 408 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
        body: unknown;
        headers: Headers;
    }>;
    syncDiscord: (args: {
        cache?: RequestCache | undefined;
        params: {
            userId: string;
        };
        fetchOptions?: import("@ts-rest/core").FetchOptions | undefined;
        extraHeaders?: Record<string, string> | undefined;
        overrideClientOptions?: Partial<import("@ts-rest/core").OverrideableClientArgs> | undefined;
    }) => Promise<{
        status: 401;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 403;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 204;
        body: null;
        headers: Headers;
    } | {
        status: 404;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 200 | 409 | 100 | 101 | 102 | 201 | 202 | 203 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 402 | 405 | 406 | 407 | 408 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
        body: unknown;
        headers: Headers;
    }>;
    setSuperAdmin: (args: {
        body: {
            value: boolean;
        };
        cache?: RequestCache | undefined;
        params: {
            userId: string;
        };
        fetchOptions?: import("@ts-rest/core").FetchOptions | undefined;
        extraHeaders?: Record<string, string> | undefined;
        overrideClientOptions?: Partial<import("@ts-rest/core").OverrideableClientArgs> | undefined;
    }) => Promise<{
        status: 401;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 403;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 204;
        body: null;
        headers: Headers;
    } | {
        status: 404;
        body: {
            code: string;
        };
        headers: Headers;
    } | {
        status: 200 | 409 | 100 | 101 | 102 | 201 | 202 | 203 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 402 | 405 | 406 | 407 | 408 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
        body: unknown;
        headers: Headers;
    }>;
};
export declare const wanApi: {
    users: {
        getById: (args: {
            cache?: RequestCache | undefined;
            params: {
                userId: string;
            };
            fetchOptions?: import("@ts-rest/core").FetchOptions | undefined;
            extraHeaders?: Record<string, string> | undefined;
            overrideClientOptions?: Partial<import("@ts-rest/core").OverrideableClientArgs> | undefined;
        }) => Promise<{
            status: 200;
            body: {
                id: string;
                name: string;
                isSuperAdmin: boolean;
                image?: string | null | undefined;
                disabledAt?: Date | null | undefined;
                disabledReason?: string | null | undefined;
            };
            headers: Headers;
        } | {
            status: 401;
            body: {
                code: string;
            };
            headers: Headers;
        } | {
            status: 403;
            body: {
                code: string;
            };
            headers: Headers;
        } | {
            status: 204 | 404 | 409 | 100 | 101 | 102 | 201 | 202 | 203 | 205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308 | 400 | 402 | 405 | 406 | 407 | 408 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 507 | 511;
            body: unknown;
            headers: Headers;
        }>;
    };
};
//# sourceMappingURL=api.d.ts.map