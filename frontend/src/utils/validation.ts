export interface ValidationErrors {
  [key: string]: string;
}

export const validateSignup = (name: string, email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.password = "Password must contain both letters and numbers";
  }

  return errors;
};

export const validateLogin = (email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};


export const validateTask = (title: string, description: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!title.trim()) {
    errors.title = "Title is required";
  } else if (title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (description.trim().length > 300) {
    errors.description = "Description must be under 300 characters";
  }

  return errors;
};