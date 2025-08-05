import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function AddressAutocomplete({ value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!value || value.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const viewbox = [106.4, 10.6, 106.9, 10.9].join(",");
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: value,
              format: "json",
              addressdetails: 1,
              limit: 5,
              viewbox,
              bounded: 1,
            },
          }
        );
        setSuggestions(res.data);
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [value, hasSelected]);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setHasSelected(false); 
        }}
        placeholder="Nhập địa chỉ"
        className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
      />

      {loading && (
        <div className="absolute right-2 top-2 text-gray-500">...</div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                onSelect(s);
                setSuggestions([]);
                setHasSelected(true);
              }}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default AddressAutocomplete;
