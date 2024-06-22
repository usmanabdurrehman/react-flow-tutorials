export const exampleSchema = `

  model Country{
    id: number;
    name: string;
    currency: Currency;
    animal: Animal
    capital: City;
  }
  
  model Currency{
    id: number;
    symbol: string
  }
  
  model Animal{
    id: number;
    name: string;
  }
  
  model City{
    id: number;
    name: string;
    location: Coordinates
  }
  
  model Coordinates{
    x: number;
    y: number;
  }
  
  model Vehicle{
    id: number;
    name: string;
  }  
  
`;
