export class ViewDetails {
  viewDetails: { [key: string]: boolean } = {
    wheels: false,
    interiorBolts: false,
    exteriorBolts: false,
    fabric: false,
    engine:false,
  };

  set showDetailsOf(keyToShow: string) {
    Object.keys(this.viewDetails).forEach((key: string) => {
      if (keyToShow === key) {
        this.viewDetails[key] = true;
      } else {
        this.viewDetails[key] = false;
      }
    });
  }
  get viewWheelDetails() {
    return this.viewDetails['wheels'];
  }

  get viewInteriorBolts() {
    return this.viewDetails['interiorBolts'];
  }

  get viewExteriorBolts() {
    return this.viewDetails['exteriorBolts'];
  }

  get viewfabricDetails() {
    return this.viewDetails['fabric'];
  }

  get viewEngineDetails() {
    return this.viewDetails['engine'];
  }
}
