import { UserModel, mongooseConnect } from '@/lib/dbUtils';

export default async function handler(req, res) {
  const { id } = req.query;
  const { name } = req.body;
  const { method } = req;

  try {
    await mongooseConnect();

    switch (method) {
      case 'GET':
        const user = await UserModel.findById(id).exec();
        res.status(200).json(user);
        break;

      case 'PUT':
        await UserModel.findByIdAndUpdate(id, { name });
        res.status(200).json({ message: `User with id: ${id} updated` });
        break;

      case 'DELETE':
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: `Deleted User with id: ${id}` });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
