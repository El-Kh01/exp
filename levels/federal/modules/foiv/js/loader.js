// loader.js - простой загрузчик данных
window.FOIVData = {
  organs: [],
  
  async loadData() {
    try {
      const response = await fetch('data/foivs-list.json');
      const data = await response.json();
      this.organs = data.organs;
      console.log('Данные загружены:', this.organs.length, 'органов');
      return this.organs;
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return [];
    }
  },
  
  getOrganById(id) {
    return this.organs.find(organ => organ.id === id);
  },
  
  getOrgansBySystem(system) {
    return this.organs.filter(organ => organ.system === system);
  },
  
  getOrgansByStructure(structure) {
    return this.organs.filter(organ => organ.structure === structure);
  },
  
  getOrgansBySphere(sphere) {
    return this.organs.filter(organ => organ.spheres.includes(sphere));
  },
  
  getAllOrgans() {
    return this.organs;
  }
};
