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
    driverLicense:string = '';
    driverIdentification:string = '';
    driverInsurance:string = '';

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
        this.driverLicense = '';
        this.driverIdentification = '';
        this.driverInsurance = '';
    }
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

export class DriverInfo {
    driverLicense:string = '';
    driverIdentification:string = '';
    driverInsurance:string = '';
}