import React from "react";
import { BenefitServicesForm } from "../BenefitServices/BenefitServicesForm";
import { BenefitServicesItem } from "../BenefitServices/BenefitServicesItem";
import { BenefitServicesList } from "../BenefitServices/BenefitServicesList";
import { BenefitServicesMain } from "../BenefitServices/BenefitServicesMain";

export const HomeMain = () => {
  return (
    <div>
      <BenefitServicesMain />
      <BenefitServicesList />
      {/* <BenefitServicesForm /> */}
    </div>
  );
};
