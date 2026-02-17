export const Link = ({ children, ...props }) => <a {...props}>{children}</a>;
export const Head = () => null;

export const usePage = () => ({
  props: {},
});

export const router = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  on: jest.fn(),
  visit: jest.fn(),
};

export const useForm = () => ({
  data: {},
  setData: jest.fn(),
  submit: jest.fn(),
  errors: {},
});
