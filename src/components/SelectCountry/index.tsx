type Country = {
  name: string;
  flag: string;
};

type Props = {
  defaultCountry: string;
  name: string;
  id: string;
  className?: string;
};

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: Props): Promise<JSX.Element> {
  const countries: Country[] = await getCountries();
  const flag =
    countries.find(country => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map(c => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag',
    );
    console.log('res: ', res);
    const countries: Country[] = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

export default SelectCountry;
