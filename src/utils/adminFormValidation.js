
export const emailValidation = {
    required: "Email is required",
    pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Invalid email address",
    },
};

export const passwordValidation = {
    required: "Password is required",
    minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
    }
};


export const phoneValidation = {
    required: "Phone number is required",
    pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number",
    },
};

export const usernameValidation = {
    required: "Username is required",
    minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
    },
    maxLength: {
        value: 20,
        message: "Username cannot exceed 20 characters",
    }
};