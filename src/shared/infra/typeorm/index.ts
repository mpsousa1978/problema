import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOption {
  host: string;
}

// getConnectionOptions().then(options => {
//   const newOption = options as IOption;
//   newOption.host = "database_ignite";
// });

export default async (host = "database"): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOption, {
      host
    })
  );
};