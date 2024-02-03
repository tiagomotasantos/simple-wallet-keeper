import { renderHook } from "@testing-library/react";
import useForm from "./useForm";
import { FormEvent } from "react";

describe("useForm", () => {
  const defaultValues = { test: "test" };

  test("should return default values in form data", () => {
    const { result } = renderHook(() => useForm(defaultValues));
    const { formData } = result.current;

    expect(formData).toEqual(defaultValues);
  });
  test("should set form data on change", () => {
    const { result, rerender } = renderHook(() => useForm(defaultValues));
    const { formData, onChange } = result.current;
    const expected = "new value";

    expect(formData).toEqual(defaultValues);
    onChange({
      currentTarget: { name: "test", value: expected },
    } as FormEvent<HTMLInputElement>);
    rerender();
    expect(result.current.formData).toEqual({ test: expected });
  });
  test("should set error", () => {
    const { result, rerender } = renderHook(() => useForm(defaultValues));
    const { error, setError } = result.current;
    const expected = "test error";

    expect(error).toBe("");
    setError(expected);
    rerender();
    expect(result.current.error).toEqual(expected);
  });
});
