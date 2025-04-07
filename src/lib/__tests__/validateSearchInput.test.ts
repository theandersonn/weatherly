import { validateSearchInput } from '../validateSearchInput';

describe('validateSearchInput', () => {
  it('deve chamar showToast e retornar null quando search estiver vazio', () => {
    const showToast = jest.fn();
    const result = validateSearchInput('', showToast);

    expect(showToast).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('deve chamar showToast e retornar null quando search tiver apenas espaços', () => {
    const showToast = jest.fn();
    const result = validateSearchInput('   ', showToast);

    expect(showToast).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('deve retornar o valor trimado quando search for válido', () => {
    const showToast = jest.fn();
    const result = validateSearchInput('  São Paulo  ', showToast);

    expect(showToast).not.toHaveBeenCalled();
    expect(result).toBe('São Paulo');
  });
});
