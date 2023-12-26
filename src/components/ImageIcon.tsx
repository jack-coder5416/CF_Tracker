const ImageIcon: React.FC<{
  url: string;
  classname?: string;
  wt?: string;
  ht?: string;
}> = ({ url, classname, wt, ht }) => {
  return (
    <div className="">
      <img src={url} width={wt} height={ht} className={classname} />
    </div>
  );
};

export default ImageIcon;
