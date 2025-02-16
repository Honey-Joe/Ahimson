import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const alumniSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  graduationYear: z.string().min(4, "Graduation Year is required"),
  degree: z.string().min(1, "Degree is required"),
  courseStudied: z.string().min(1, "Course Studied is required"),
  department: z.string().min(1, "Department is required"),
  accomplishments: z.string().optional(),
  honorsReceived: z.string().optional(),
  payment: z.enum(["1000", "4000"], "Payment selection is required"),
});

const AlumniRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(alumniSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted: ", data);
    alert("Form Submitted Successfully!");
  };

  return (
    <section id="registration" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Alumni Registration</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto"
        >
          {/* First Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">First Name</label>
            <input
              {...register("firstName")}
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              {...register("lastName")}
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              {...register("email")}
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Course Studied */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Course Studied</label>
            <input
              {...register("courseStudied")}
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.courseStudied && <p className="text-red-500 text-sm mt-1">{errors.courseStudied.message}</p>}
          </div>

          {/* Accomplishments */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Accomplishments</label>
            <textarea
              {...register("accomplishments")}
              rows="3"
              className="w-full border px-3 py-2 rounded-lg"
            ></textarea>
          </div>

          {/* Honors Received */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Honors Received</label>
            <textarea
              {...register("honorsReceived")}
              rows="3"
              className="w-full border px-3 py-2 rounded-lg"
            ></textarea>
          </div>

          {/* Payment */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Payment</label>
            <select
              {...register("payment")}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Select Payment</option>
              <option value="1000">₹1000</option>
              <option value="4000">₹4000</option>
            </select>
            {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AlumniRegistrationForm;
