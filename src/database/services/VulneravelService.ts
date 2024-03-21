import { Vulneravel } from "@/database/models/Vulneravel";
import { dbSource } from "../Connection";
import { CreateVulneravelDTO } from "@/lib/DTO/Vulneravel";

export class VulneravelService {
  static async getAll() {
    const vulneravelRepository = await dbSource.getRepository(Vulneravel);

    return vulneravelRepository.find();
  }

  static async findOne(id: string) {
    const vulneravelRepository = await dbSource.getRepository(Vulneravel);

    return vulneravelRepository.findOne({
      where: { id },
    });
  }

  static async new(dto: CreateVulneravelDTO) {
    const vulneravelRepository = await dbSource.getRepository(Vulneravel);

    const entity = vulneravelRepository.create({ ...dto });

    await vulneravelRepository.insert(entity);

    return entity;
  }
}
