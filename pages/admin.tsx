import { GetServerSideProps } from "next";
import { withRole } from "../src/withRoles"; // Adjust the import path
import Role from "../src/roles";

export const getServerSideProps: GetServerSideProps = withRole(
  async (context) => {
    // Your page logic here
    return {
      props: {
        // your props
      },
    };
  },
  [Role.USER] // TODO: This should be Admin only
); // Replace with the roles that should have access

const Admin = (
  {
    /* your props */
  }
) => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>You probably shouldn't be here...</p>
    </div>
  );
};

export default Admin;
