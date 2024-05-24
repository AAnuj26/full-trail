class dataService {
  data: {
    name: string;
    age: number;
    location: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    designation: string;
    from: string;
  };

  constructor() {
    this.data = {
      name: "Anuj Bhagat",
      age: 25,
      location: "India",
      email: "anuj@gmail.com",
      phone: "123456789",
      address: "e1/17/c-10 sector 3 rohini delhi 110085",
      company: "google",
      designation: "sde2",
      from: "dataService.js",
    };
  }
  async getData() {
    return this.data;
  }
}

export default dataService;
