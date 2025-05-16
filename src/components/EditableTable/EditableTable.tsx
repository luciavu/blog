type EditableTableProps<T extends { id: number }> = {
  fields: (keyof T)[];
  values: T[];
  typeName: string;
  handleDelete: (value: T) => void;
  handleInputChange?: (id: number, field: keyof T, value: string | boolean) => void;
  handleSave?: (value: T) => void;
  handleCreate?: () => void;
};

export const EditableTable = <T extends { id: number }>({
  fields,
  values,
  typeName,
  handleDelete,
  handleInputChange,
  handleSave,
  handleCreate,
}: EditableTableProps<T>) => {
  return (
    <div className={`${typeName}-summary`}>
      <h1>
        {typeName} ({values.length})
      </h1>
      <table>
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th key={index}>{String(field)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((value) => (
            <tr key={value.id}>
              {fields.map((field, index) => (
                <td key={index}>
                  {field === 'published' ? (
                    <input
                      type="checkbox"
                      checked={Boolean(value[field])}
                      onChange={(e) => handleInputChange?.(value.id, field, e.target.checked)}
                    />
                  ) : field === 'id' ? (
                    <div>{value.id > 0 ? value.id : ''}</div>
                  ) : field === 'content' ? (
                    <textarea
                      value={String(value[field])}
                      onChange={(e) => handleInputChange?.(value.id, field, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(value[field])}
                      onChange={(e) => handleInputChange?.(value.id, field, e.target.value)}
                    />
                  )}
                </td>
              ))}
              {value.id > 0 ? (
                <>
                  <td>
                    <button onClick={() => handleSave?.(value)}>Save changes</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(value)}>Delete</button>
                  </td>
                </>
              ) : (
                <td colSpan={2}>
                  <button onClick={() => handleCreate?.()}>Add</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
