import React from "react"
import { BenefitServicesForm } from "../BenefitServices/BenefitServicesForm"
import { BenefitServicesItem } from "../BenefitServices/BenefitServicesItem"
import { BenefitServicesList } from "../BenefitServices/BenefitServicesList"

export const HomeMain=()=>{
  return (
    <div>
      {/* <BenefitServicesForm /> */}
      <BenefitServicesList />
      {/* <BenefitServicesItem /> */}
    </div>
  )
}
