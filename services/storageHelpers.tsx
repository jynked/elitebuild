// Функция для получения всех сохранённых продуктов из localStorage
export const getSavedProducts = (): any[] => {
    try {
      return JSON.parse(localStorage.getItem('savedProducts') || '[]');
    } catch (error) {
      console.error('Ошибка при чтении savedProducts из localStorage:', error);
      return [];
    }
  };
  
  // Функция для сохранения продукта в localStorage
  export const saveProduct = (product: any): void => {
    try {
      const currentSaved = getSavedProducts();
      const updatedSaved = [...currentSaved, product];
      localStorage.setItem('savedProducts', JSON.stringify(updatedSaved));
    } catch (error) {
      console.error('Ошибка при сохранении продукта в localStorage:', error);
    }
  };
  
  // Функция для удаления продукта из localStorage по его ID
  export const removeProduct = (productId: number): void => {
    try {
      const currentSaved = getSavedProducts();
      const updatedSaved = currentSaved.filter((product: any) => product.id !== productId);
      localStorage.setItem('savedProducts', JSON.stringify(updatedSaved));
    } catch (error) {
      console.error('Ошибка при удалении продукта из localStorage:', error);
    }
  };
  
  // Функция для проверки, находится ли продукт в избранном
  export const isProductSaved = (productId: number): boolean => {
    const currentSaved = getSavedProducts();
    return currentSaved.some((product: any) => product.id === productId);
  };
  