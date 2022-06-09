//get custom keys for id
import uuid from "react-uuid";

const QueryResult = ({ data, tableName }) => {
  //get property names of objects
  const dataProperties = Object.keys(data[0]);

  //get first property name of object
  const firstDataPropertyName = dataProperties[0];

  //sort result based on data ID
  if (typeof data[0][firstDataPropertyName] === "number") {
    //sorting based on numbers
    data.sort((a, b) => {
      return a[firstDataPropertyName] - b[firstDataPropertyName];
    });
  } else {
    //sorting based on strings
    data.sort((a, b) => {
      let fa = a[firstDataPropertyName].toLowerCase(),
        fb = b[firstDataPropertyName].toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="flex">
      <table>
        <caption>{tableName || "Categories"}</caption>
        <thead>
          <tr>
            {dataProperties.map((obj) => (
              <th key={uuid()}>{obj}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={uuid()}>
              {dataProperties.map((property) => (
                <td key={uuid()}>
                  {/* check if an items value is an object or an array */}
                  {typeof item[property] !== "object"
                    ? item[property]
                    : Array.isArray(item[property])
                    ? item[property].map((val) => `${val}, `)
                    : Object.values(item[property]).map((val) => `${val}, `)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryResult;
