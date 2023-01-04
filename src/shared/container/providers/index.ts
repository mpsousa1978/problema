import { container } from "tsyringe"
import { IDateProvider } from "./DateProvider/IDateProvider"
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateprovider"




container.registerSingleton<IDateProvider>(
  "DayjsDateProvider", DayjsDateProvider
)