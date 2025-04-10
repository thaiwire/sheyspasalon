"use server";

import supabase from "@/config/supabase-config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerNewUser = async ({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    // check if user already exists
    const { data, error } = await supabase
      .from("user_profiles")
      .select("email")
      .eq("email", email);
    if (data && data.length > 0) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // hash password
    console.log("Password", password);

    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log("hashedPassword", hashedPassword);
    const newUserObj = {
      name,
      email,
      password: hashedPassword,
      role,
      is_active: true,
    };
    // insert user into database
    const { data: userData, error: userError } = await supabase
      .from("user_profiles")
      .insert(newUserObj);

    if (userError) {
      return {
        success: false,
        message: userError.message,
      };
    }
    return {
      success: true,
      message: "User created successfully",
      data: userData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const loginUser = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}) => {
  try {
    // find user with email
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email);
    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    if (data && data.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (data[0].role !== role) {
      return {
        success: false,
        message: "Invalid Role",
      };
    }

    // check if password is correct
    console.log("password db",data[0].password)

    const isPasswordValid = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password",
      };
    }
    // generate JWT token
    const token = jwt.sign(
      { id: data[0].id },
      process.env.JWT_SECRET! as string,
      {
        expiresIn: "1d",
      }
    );
    return {
     success: true,
      message: "Login successful",
      data : token
    };
  } catch (error : any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET! as string);
    const userId = decoded.id;

    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId);
    if (!data || data.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      message: "User found",
      data: data[0],
    };

    
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
    
  }
}
