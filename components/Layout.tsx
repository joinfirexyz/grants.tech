interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="flex w-full h-full">{children}</div>;
};

export default Layout;
