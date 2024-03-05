import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import userService, { User } from "../services/user-service";
import useUsers from "../hooks/useUsers";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" })
    .max(20, { message: "Username must not contain more than 20 characters" }),
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters" })
    .max(20, { message: "Name must not contain more than 20 characters" }),
  email: z.string().email(),
});

type UserFormData = z.infer<typeof schema>;

const Users = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: zodResolver(schema) });
  const { users, error, isLoading, tableSkeleton, setUsers, setError } =
    useUsers();

  const deleteUser = (id: number) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    userService.delete(id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = (data: FieldValues) => {
    const originalUsers = [...users];
    userService
      .add(data)
      .then((res) => setUsers([...users, res.data]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: "Updated Name" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div className="container my-5">
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      {isLoading && (
        <table className="table">
          <thead>
            <tr className="placeholder-glow">
              <th>
                <span className="placeholder col-1"></span>
              </th>
              <th>
                <span className="placeholder col-12"></span>
              </th>
              <th>
                <span className="placeholder col-12"></span>
              </th>
              <th>
                <span className="placeholder col-12"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableSkeleton.map((skeleton) => (
              <tr className="placeholder-glow" key={skeleton}>
                <td>
                  <span className="placeholder col-1"></span>
                </td>
                <td>
                  <span className="placeholder col-12"></span>
                </td>
                <td>
                  <span className="placeholder col-12"></span>
                </td>
                <td>
                  <span className="placeholder col-12"></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => updateUser(user)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <form onSubmit={handleSubmit(addUser)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            {...register("username")}
            id="username"
            type="text"
            className="form-control"
            autoComplete="off"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
            autoComplete="off"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className="form-control"
            autoComplete="off"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <button className="btn btn-dark" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Users;
