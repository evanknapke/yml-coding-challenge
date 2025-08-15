import { GetServerSideProps } from "next";
import { withRole } from "../src/withRoles";
import Role from "../src/roles";

export const getServerSideProps: GetServerSideProps = withRole(
  async (_context) => {
    return {
      props: { }
    };
  },
  [ Role.ADMIN ]
);

const Admin = ({ }) => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>You probably shouldn't be here...</p>
    </div>
  );
};

export default Admin;
