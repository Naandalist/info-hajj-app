function isStatusLunas(statusString: string): boolean {
  const upperCaseStatus = statusString.toUpperCase();

  return !upperCaseStatus.includes('BELUM LUNAS');
}

export {isStatusLunas};
