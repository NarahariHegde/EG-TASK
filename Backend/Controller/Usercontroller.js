import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { query } from "../Configure/config.js";

const signup = async (req, res) => {
  try {
    const { name, age, gender, phone, password } = req.body;

    const hashedPassword = await hash(password, 10);

    query(
      "INSERT INTO users (name, age, gender, phone, password) VALUES (?, ?, ?, ?, ?)",
      [name, age, gender, phone, hashedPassword],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "User created successfully" });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    query(
      "SELECT * FROM users WHERE name = ?",
      [name],
      async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { signup, login };
