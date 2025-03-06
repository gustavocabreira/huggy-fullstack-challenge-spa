const formatDate = (date: string) => {
  const dateObject = new Date(date);

  if (!dateObject) {
    return '-';
  }

  return dateObject.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export default formatDate;