export const cepStandardToNumber = (cepStandard: string) => {
  if (cepStandard.toLocaleLowerCase() == "cep47") {
    return 0;
  } else {
    return 1;
  }
};
