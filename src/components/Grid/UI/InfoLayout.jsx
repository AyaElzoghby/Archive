/* eslint-disable react/prop-types */
function InfoLayout({ data, configuration, lang = "ar", children }) {
  //   console.log(data, "infolayout");
  return (
    <>
      <div className="flex justify-between flex-wrap p-4 font-tajawal">
        {configuration.map((config, index) => {
          return (
            (config.arCaption || config.enCaption) && (
              <div key={index} className="flex gap-3">
                <p className=" font-bold">{`${
                  lang === "en" ? config.enCaption : config.arCaption
                }:`}</p>
                <p className="">{data[config.keyName]}</p>
              </div>
            )
          );
        })}
      </div>
      <>{children}</>
    </>
  );
}

export default InfoLayout;
