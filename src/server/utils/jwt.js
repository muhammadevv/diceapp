import { decodeJwt, jwtVerify, SignJWT } from 'jose';

/**
 * Secret key for the token.
 */
const JWT_SECRET_KEY = 'your_secret_key';

/**
 * Create a token with the given payload.
 */
function buildCreateToken(expirationTime) {
  return async (payload) => {
    const encoder = new TextEncoder();
    const key = encoder.encode(JWT_SECRET_KEY);
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(key);
  };
}

export const createAuthToken = buildCreateToken('1Y');
export const createPayloadToken = buildCreateToken('15m');

/**
 * Verify the given token.
 */
export async function verifyToken(token) {
  const encoder = new TextEncoder();
  const key = encoder.encode(JWT_SECRET_KEY);
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Decode the given token.
 */
function buildDecodeToken() {
  return (token) => {
    try {
      return decodeJwt(token);
    } catch (e) {
      return null;
    }
  };
}

export const decodeAuthToken = buildDecodeToken();
export const decodePayloadToken = buildDecodeToken();
