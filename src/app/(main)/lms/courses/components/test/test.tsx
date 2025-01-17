"use client";
import Button from "@/src/components/button/Button";
import Switch from "@/src/components/switch/Switch";
import Toggle from "@/src/components/toggle/Toggle";
import { useRouter } from "nextjs-toploader/app";
import React, { useState } from "react";

const Test = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("mandatory");
  return (
    <div className="nu-flex nu-ai-center nu-gap-4">
      <div style={{ width: "200px" }}>
        <Button
          title="go to existing course"
          onClick={() => {
            router.push("/lms/courses/manage-courses/123/course-settings");
          }}
        />
      </div>
      <Switch
        options={[
          { label: "Non-mandatory", value: "non-mandatory" },
          { label: "Mandatory", value: "mandatory" },
        ]}
        selectedOption={selectedOption}
        onClick={(value) => {
          setSelectedOption(value);
        }}
      />
      <Toggle checked={true} onChange={() => {}} />
    </div>
  );
};

export default Test;
