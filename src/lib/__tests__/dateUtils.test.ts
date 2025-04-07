import {
  getFormattedDayAndMonth,
  formatToLocalTime,
  getShortWeekdayName,
} from '../dateFormat';

describe('dateUtils', () => {
  const sampleDate = new Date('2023-07-15T14:30:00Z'); // UTC
  const timeZone = 'America/Sao_Paulo';

  describe('getFormattedDayAndMonth', () => {
    it('deve retornar o dia e mês formatado corretamente', () => {
      const result = getFormattedDayAndMonth(sampleDate, timeZone);
      expect(result).toMatch(/^\d{1,2} [A-Z]{3}$/);
    });
  });

  describe('formatToLocalTime', () => {
    it('deve retornar o horário local corretamente a partir de timestamp', () => {
      const timestamp = Math.floor(sampleDate.getTime() / 1000);
      const result = formatToLocalTime(timestamp, timeZone);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('deve retornar o horário local corretamente a partir de objeto Date', () => {
      const result = formatToLocalTime(sampleDate, timeZone);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  describe('getShortWeekdayName', () => {
    it('deve retornar o nome do dia da semana abreviado corretamente', () => {
      const result = getShortWeekdayName(sampleDate.getTime(), timeZone);
      expect(result).toMatch(/^(DOM|SEG|TER|QUA|QUI|SEX|SÁB)$/);
    });
  });
});
