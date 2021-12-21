const dateFormatter = (stringDate: string) => new Intl.DateTimeFormat('pt-BR').format(new Date(stringDate))

export default dateFormatter
