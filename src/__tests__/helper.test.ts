import { createClient } from '../helper';

const mockMakeId = (id: number) => () => {
    return id;
}

describe('helper', () => {

    test('test create client with known id', () => {

        expect(createClient('john', mockMakeId(100))).toEqual({
            id: 100,
            name: 'john',
        });
    });

    test('test create client with known id', () => {

        const client = createClient('jun');
        expect(client.name).toEqual('jun');
        expect(typeof client.id).toBe('number');
    });

});
