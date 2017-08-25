export class FormData {
  userType: string = '';
  firstName: string = '';
  lastName : string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  carYear: number;
  carBrand: string = '';
  carModel: string = '';
  carTrim: string = '';
  carColor: string = '';
  carPlateNumber: string = '';
  carTransmittion: string = '';
  availCarTypeSedan: boolean;
  availCarTypeSuv: boolean;
  availCarTypeVan: boolean;
  availCarTransmissionAuto: boolean;
  availCarTransmissionManual: boolean;
  facePhotoLocation:string = '';
  bankAccountNumber:number;
  bankRoutingNumber:number;
  ssn:number;

  year:number;
  month:number;
  day:number;
  city:string = '';
  line1:string = '';
  zipCode:string = '';
  state:string = '';
  id:string='';

  driverLicense:string = '';
  driverIdentification:string = '';
  driverInsurance:string = '';

  cardNum:string = '';
  cardYear:string ='';
  cardMonth :string ='';
  cardCvc : string = '';

  map: any;
  socket: any;
  stepFlow:any;
  socketId : any;
  userGrade:number;
  driverGrade:number;

  clear() {
    this.userType = '';
    this.firstName = '';
    this.lastName  = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.carYear;
    this.carBrand = '';
    this.carModel = '';
    this.carTrim = '';
    this.carColor = '';
    this.carPlateNumber = '';
    this.carTransmittion = '';
    this.availCarTypeSedan = false;
    this.availCarTypeSuv = false;
    this.availCarTypeVan = false;
    this.availCarTransmissionAuto = false;
    this.availCarTransmissionManual = false;
    this.facePhotoLocation = '';
    this.bankAccountNumber;
    this.bankRoutingNumber;
    this.ssn;
    this.city = '';
    this.line1 = '';
    this.zipCode = '';
    this.state = '';
    this.year;
    this.month;
    this.day;
    this.driverLicense = '';
    this.driverIdentification = '';
    this.driverInsurance = '';

    this.cardNum = '';
    this.cardYear = '';
    this.cardMonth = '';
    this.cardCvc  = '';
    this.map;
    this.socket;
    this.stepFlow;
    this.socketId;
    this.userGrade;
    this.driverGrade;
  }
}

export class Card {
  cardNum:string = '';
  cardYear:string ='';
  cardMonth :string ='';
  cardCvc : string = '';
}

export class RegisterType {
  userType: string = '';
}
export class Personal {
  firstName: string = '';
  lastName : string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  id: string = '';
  userGrade:number;
  driverGrade:number;
}

export class FacePhoto {
  facePhotoLocation = '';
}

export class Rider {
  carYear: number;
  carBrand: string = '';
  carModel: string = '';
  carTrim: string = '';
  carColor: string = '';
  carPlateNumber: string = '';
  carTransmittion: string = '';
}

export class DriverPref {
  availCarTypeSedan: boolean;
  availCarTypeSuv: boolean;
  availCarTypeVan: boolean;
  availCarTransmissionAuto: boolean;
  availCarTransmissionManual: boolean;
}

export class Bank {
  bankAccountNumber:number;
  bankRoutingNumber:number;
  ssn:number;
}

export class Birth {
  year:number;
  month:number;
  day:number;
}

export class Address {
  city:string;
  line1:string;
  zipCode:string;
  state:string;
}

export class DriverInfo {
  driverLicense:string = '';
  driverIdentification:string = '';
  driverInsurance:string = '';
}

export class Domain {
  ip:string = 'http://192.168.1.219:8081';
  map:any;
  socket:any;
  socketId:any;
}
