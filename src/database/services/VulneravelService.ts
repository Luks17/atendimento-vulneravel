import { Vulneravel } from "@/database/models/Vulneravel";
import { dbSource } from "../Connection";
import { CreateVulneravelDTO } from "@/lib/DTO/Vulneravel";

export class VulneravelService {
  static async getAll() {
    const vulneravelRepository = await dbSource.getRepository(Vulneravel);

    return await vulneravelRepository.find({ relations: { tipos: true } });
  }

  static async findOne(id: string) {
    const vulneravelRepository = await dbSource.getRepository(Vulneravel);

    return await vulneravelRepository.findOne({
      where: { id },
      relations: { tipos: true },
    });
  }

  static async new(dto: CreateVulneravelDTO) {
    const vulneravelRepository = await dbSource.getRepository(Vulneravel);

    const entity = vulneravelRepository.create({ ...dto });

    await vulneravelRepository.save(entity);

    return entity;
  }
}
