const createRequest = (type: number, id: number, body: string): ArrayBuffer => {
    const bodyLength = new TextEncoder().encode(body).length;
    const size = bodyLength + 14;
    const buffer = new ArrayBuffer(size);
    const dv = new DataView(buffer);

    dv.setInt32(0, size - 4, true); // true 代表使用小端字节序
    dv.setInt32(4, id, true);
    dv.setInt32(8, type, true);

    const uint8 = new Uint8Array(buffer);

    // Write body at the appropriate point
    new TextEncoder().encodeInto(body, uint8.subarray(12, size - 2));

    // Two zero bytes at the end
    uint8[size - 2] = 0;
    uint8[size - 1] = 0;

    return buffer;
};

interface IResponse {
    size: number;
    id: number;
    type: number;
    body: string;
}

const readResponse = (buffer: ArrayBuffer): IResponse => {
    const dv = new DataView(buffer);

    const size = dv.getInt32(0, true);
    const id = dv.getInt32(4, true);
    const type = dv.getInt32(8, true);
    const body = new TextDecoder('ascii').decode(
        new Uint8Array(buffer, 12, size - 14),
    );

    return {
        size,
        id,
        type,
        body,
    };
};

export { createRequest, readResponse };
