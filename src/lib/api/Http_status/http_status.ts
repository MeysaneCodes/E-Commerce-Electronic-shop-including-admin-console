export class HttpStatus {
    // 1xx: Informational
    static CONTINUE = 100;              // Request received, continuing process
    static SWITCHING_PROTOCOLS = 101;   // Protocol switch requested by client

    // 2xx: Success
    static OK = 200;                    // Standard response for successful HTTP requests
    static CREATED = 201;              // Request succeeded, new resource created
    static ACCEPTED = 202;             // Request accepted, processing not complete
    static NO_CONTENT = 204;           // Request succeeded, but no content to return

    // 3xx: Redirection
    static MOVED_PERMANENTLY = 301;    // Resource moved permanently to a new URL
    static FOUND = 302;                // Resource temporarily located at a different URI
    static NOT_MODIFIED = 304;         // Resource not modified since last request

    // 4xx: Client Errors
    static BAD_REQUEST = 400;          // Client sent invalid request
    static UNAUTHORIZED = 401;         // Authentication required or failed
    static FORBIDDEN = 403;            // Valid credentials, but no permission
    static NOT_FOUND = 404;            // Resource not found
    static METHOD_NOT_ALLOWED = 405;// HTTP method not allowed for this endpoint
    static CONFLICT = 409;
    static UNPROCESSABLE_ENTITY = 422;// Request conflict (e.g. duplicate entry)
    static TOO_MANY_REQUESTS = 429;    // Client exceeded rate limit

    // 5xx: Server Errors
    static INTERNAL_SERVER_ERROR = 500; // Generic server error
    static NOT_IMPLEMENTED = 501;       // Server does not support requested feature
    static BAD_GATEWAY = 502;           // Invalid response from upstream server
    static SERVICE_UNAVAILABLE = 503;   // Server overloaded or down for maintenance
    static GATEWAY_TIMEOUT = 504;       // Upstream server failed to respond in time
}