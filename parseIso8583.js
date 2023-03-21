exports.parseIso8583 = function(message){
    const fields = {
        '2': { name: 'PAN', length: 16 },
        '3': { name: 'Processing Code', length: 6 },
        '4': { name: 'Amount', length: 12 },
        '7': { name: 'Transmission Date and Time', length: 10 },
        '11': { name: 'STAN', length: 6 },
        '12': { name: 'Local Time', length: 6 },
        '13': { name: 'Local Date', length: 4 },
        '14': { name: 'Expiration Date', length: 4 },
        '22': { name: 'POS Entry Mode', length: 3 },
        '23': { name: 'Card Sequence Number', length: 3 },
        '25': { name: 'POS Condition Code', length: 2 },
        '26': { name: 'POS PIN Capture Code', length: 2 },
        '32': { name: 'Acquiring Institution Identification Code', length: 11 },
        '35': { name: 'Track 2 Data', length: 37 },
        '37': { name: 'Retrieval Reference Number', length: 12 },
        '38': { name: 'Approval Code', length: 6 },
        '39': { name: 'Response Code', length: 2 },
        '41': { name: 'Card Acceptor Terminal Identification', length: 8 },
        '42': { name: 'Card Acceptor Identification Code', length: 15 },
        '43': { name: 'Card Acceptor Name/Location', length: 40 },
        '49': { name: 'Currency Code', length: 3 },
        '52': { name: 'Personal Identification Number (PIN) Data', length: 8 },
        '53': { name: 'Security Related Control Information', length: 16 },
        '54': { name: 'Amounts, Additional', length: 120 },
        '55': { name: 'EMV Data', length: 255 },
        '62': { name: 'Reserved Private', length: 999 },
        '63': { name: 'Reserved Private', length: 999 },
    };

    const fieldsArray = [];

    // Extrair o MTI
    const MTI = message.slice(0, 4);
    fieldsArray.push({ 'MTI': MTI, name: 'Message Type Indicator' });

    // Extrair o Bitmap primário
    const BMP = message.slice(4, 20);
    fieldsArray.push({ 'BMP': BMP, name: 'Bitmap' });

    let position = 20;
    for (const [key, value] of Object.entries(fields)) {
        const length = value.length;
        const fieldData = message.slice(position, position + length);
        position += length;
        fieldsArray.push({ [key]: fieldData, name: value.name });
    }

    return fieldsArray;
}

exports.parseIso8583_v2 = function(message) {
    const fields = [
        { field: '2', name: 'PAN', length: 16 },
        { field: '3', name: 'Código de processamento', length: 6 },
        { field: '4', name: 'Valor da transação', length: 12 },
        { field: '5', name: 'Valor da liquidação', length: 12 },
        { field: '5', name: 'Valor da devido', length: 12 },
        { field: '7', name: 'Data/Hora envio da transação', length: 10 },
        { field: '9', name: 'Data liquidação', length: 8 },
        { field: '10', name: 'Data conversão', length: 8 },
        { field: '11', name: 'Número de referência transação', length: 6 },
        { field: '12', name: 'Hora referência transação', length: 6 },
        { field: '13', name: 'Data validade do cartão', length: 4 },
        { field: '14', name: 'Data expiração do cartão', length: 4 },
        { field: '15', name: 'Data compensação', length: 4 },
        { field: '18', name: 'Código de categoria de mercadoria / serviços', length: 4 },
        { field: '19', name: 'Código de identificação do adquirente', length: 3 },
        { field: '22', name: 'Código de identificação da rede', length: 3 },
        { field: '23', name: 'Código de sequência do cartão', length: 3 },
        { field: '25', name: 'Código de motivo da mensagem', length: 2 },
        { field: '26', name: 'Código de identificação do cartão', length: 2 },
        { field: '26', name: 'Valor da taxa de serviço', length: 9 },
        { field: '32', name: 'Identificação do adquirente', length: 11 },
        { field: '35', name: 'Dados de trilha 2', length: 37 },
        { field: '36', name: 'Dados de trilha 3', length: 104},
        { field: '37', name: 'Número de sequência da transação', length: 12 },
        { field: '38', name: 'Código de autorização', length: 6 },
        { field: '39', name: 'Código de resposta da transação', length: 2 },
        { field: '41', name: 'Terminal ID', length: 8 },
        { field: '42', name: 'Identificação do comerciante', length: 15 },
        { field: '43', name: 'Indentificação nome/localização', length: 40 },
        { field: '44', name: 'Identificação do banco emissor', length: 25 },
        { field: '45', name: 'Dados de trilha 1', length:76 },
        { field: '48', name: 'Campos privados adicionais', length: 999},
        { field: '49', name: 'Código Corrente', length: 3 },
        { field: '52', name: 'Dados do PIN', length: 8 },
        { field: '53', name: 'Valor do cheque', length: 16 },
        { field: '54', name: 'Valores adicionais', length: 120 },
        { field: '55', name: 'EMV Data', length: 255 },
        { field: '56', name: 'Informações adicionais', length: 999 },
        { field: '62', name: 'Reserved Private', length: 255 },
        { field: '63', name: 'Reserved Private', length: 255 },
        { field: '64', name: 'Mensagem de autenticação', length: 8 }
    ];

    const result = [];

    // Extrair o MTI
    const MTI = message.slice(0, 4);
    result.push({ field: 'MTI', value: MTI, name: 'Message Type Indicator' });

    // Extrair o Bitmap primário
    const BMP = message.slice(4, 20);
    result.push({ field: 'BMP', value: BMP, name: 'Bitmap' });

    let position = 20;
    for (const field of fields) {
        const { length, name, field: fieldName } = field;
        const fieldData = message.slice(position, position + length);
        position += length;
        result.push({ field: fieldName, value: fieldData, name, length: length });
    }

    return result;
};