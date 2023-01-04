import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository"



class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specification: Specification[] = [];

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description, name
    })

    this.specification.push(specification);
    return specification;
  }

  async findByname(name: string): Promise<Specification> {
    return this.specification.find((specification) => specification.name === name);

  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specification.filter((specification) =>
      ids.includes(specification.id));

    return allSpecification;
  }
}

export { SpecificationsRepositoryInMemory }

