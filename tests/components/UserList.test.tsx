import { User } from "../../src/entities";
import UserList from "../../src/components/UserList";
import { render, screen } from "@testing-library/react";

describe("UserList", () => {
  it("should render no users when the users array is empty", () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const users: User[] = [
      { id: 1, name: "Itay" },
      { id: 2, name: "Amit" },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
