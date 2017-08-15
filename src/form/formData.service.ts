import { Injectable } from '@angular/core';
import {
  FormData, RegisterType, Personal, Rider, DriverPref, FacePhoto, Bank, DriverInfo,
  Address, Birth, Card
} from './formData.model';
import { RegisterFlowService } from '../registerFlow/registerFlow.service';
import { STEPS } from '../registerFlow/registerFlow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;
    private isRiderFormValid: boolean = false;
    private isDriverPrefValid: boolean = false;
    private isFacePhotoValid: boolean = false;
    private isBankValid: boolean = false;
    private isDriverInfoValid: boolean = false;
    private isBirthValue:boolean = true;
    private isAddressValue:boolean = true;

    constructor(private registerflowservice: RegisterFlowService) {
    }

    getType(): RegisterType {
        var type: RegisterType = {
            userType: this.formData.userType
        }
        // Return the user type
        return type;
    }

    setType(data: RegisterType) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.userType = data.userType;
        // Validate Work Step in Workflow
        // this.registerflowservice.validateStep(STEPS.work);
    }

    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
            phone: this.formData.phone,
            password: this.formData.password,
            id: this.formData.id
        };
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        this.formData.phone = data.phone;
        this.formData.password = data.password;
        this.formData.id = data.id;
        // Validate Personal Step in Workflow
        this.registerflowservice.validateStep(STEPS.Personal);
    }

    getFacePhoto(): FacePhoto {
        var facePhoto: FacePhoto = {
            facePhotoLocation: this.formData.facePhotoLocation
        }
        // Return the user type
        return facePhoto;
    }

    setFacePhoto(data: FacePhoto) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.facePhotoLocation = data.facePhotoLocation;
        // Validate Work Step in Workflow
        this.registerflowservice.validateStep(STEPS.FacePhoto);
    }

    getRider() : Rider {
        // Return the Address data
        var rider: Rider = {
            carYear: this.formData.carYear,
            carBrand: this.formData.carBrand,
            carModel: this.formData.carModel,
            carTrim: this.formData.carTrim,
            carColor: this.formData.carColor,
            carPlateNumber: this.formData.carPlateNumber,
            carTransmittion: this.formData.carTransmittion
        };
        return rider;
    }

    setRider(data: Rider) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isRiderFormValid = true;
        this.formData.carYear = data.carYear;
        this.formData.carBrand = data.carBrand;
        this.formData.carModel = data.carModel;
        this.formData.carTrim = data.carTrim;
        this.formData.carColor = data.carColor;
        this.formData.carPlateNumber = data.carPlateNumber;
        this.formData.carTransmittion  = data.carTransmittion;
        // Validate Address Step in Workflow
        this.registerflowservice.validateStep(STEPS.Rider);
    }

    getDriver() : DriverPref {
        // Return the Address data
        var driverPref: DriverPref = {
            availCarTypeSedan: this.formData.availCarTypeSedan,
            availCarTypeSuv: this.formData.availCarTypeSuv,
            availCarTypeVan: this.formData.availCarTypeVan,
            availCarTransmissionAuto: this.formData.availCarTransmissionAuto,
            availCarTransmissionManual: this.formData.availCarTransmissionManual
        };
        return driverPref;
    }

    setDriver(data: DriverPref) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isDriverPrefValid = true;
        this.formData.availCarTypeSedan = data.availCarTypeSedan;
        this.formData.availCarTypeSuv = data.availCarTypeSuv;
        this.formData.availCarTypeVan = data.availCarTypeVan;
        this.formData.availCarTransmissionAuto = data.availCarTransmissionAuto;
        this.formData.availCarTransmissionManual = data.availCarTransmissionManual;
        // Validate Address Step in Workflow
        this.registerflowservice.validateStep(STEPS.DriverPref);
    }

    getBank() : Bank {
        // Return the Address data
        var driverPref: Bank = {
            bankAccountNumber: this.formData.bankAccountNumber,
            bankRoutingNumber: this.formData.bankRoutingNumber,
            ssn: this.formData.ssn
        };
        return driverPref;
    }

    setBank(data: Bank) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isBankValid = true;
        this.formData.bankAccountNumber = data.bankAccountNumber,
        this.formData.bankRoutingNumber  = data.bankRoutingNumber,
        // Validate Address Step in Workflow
        this.registerflowservice.validateStep(STEPS.Bank);
    }

    getAddress() : Address {
      // Return the Address data
      var driverInfo: Address = {
        city: this.formData.city,
        line1: this.formData.line1,
        zipCode: this.formData.zipCode,
        state: this.formData.state
      }

      return driverInfo;
    }

    setAddress(data: Address) {
      this.isAddressValue = true;
      this.formData.city = data.city;
      this.formData.line1 = data.line1;
      this.formData.zipCode = data.zipCode;
      this.formData.state = data.state;
      this.registerflowservice.validateStep(STEPS.Bank);
    }

    getBirth() : Birth{
      var driverInfo: Birth = {
        year : this.formData.year,
        month : this.formData.month,
        day : this.formData.day
      }

      return driverInfo;
    }

    setBirth(data : Birth) {
      this.isBirthValue = true;
      this.formData.year = data.year;
      this.formData.month = data.month;
      this.formData.day = data.day;
      this.registerflowservice.validateStep(STEPS.Bank);
    }

    getCard() {
      var cardInfo: Card = {
        cardNum: this.formData.cardNum,
        cardYear: this.formData.cardYear,
        cardMonth: this.formData.cardMonth,
        cardCvc: this.formData.cardCvc
      }

      return cardInfo;
    }

    setCard(data: Card) {
      this.formData.cardNum = data.cardNum;
      this.formData.cardYear = data.cardYear;
      this.formData.cardMonth = data.cardMonth;
      this.formData.cardCvc  = data.cardCvc;
    }

    getDriverInfo() : DriverInfo {
        // Return the Address data
        var driverInfo: DriverInfo = {
            driverLicense: this.formData.driverLicense,
            driverIdentification: this.formData.driverIdentification,
            driverInsurance: this.formData.driverInsurance
        };
        return driverInfo;
    }

    setDriverInfo(data: DriverInfo) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isDriverInfoValid = true;
        this.formData.driverLicense = data.driverLicense;
        this.formData.driverIdentification  = data.driverIdentification;
        this.formData.driverInsurance  = data.driverInsurance;
        // Validate Address Step in Workflow
        this.registerflowservice.validateStep(STEPS.DriverInfo);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.registerflowservice.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid &&
                this.isAddressFormValid;
    }
}
