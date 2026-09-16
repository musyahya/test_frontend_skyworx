"use client";

import React, { PropsWithChildren, ReactNode } from "react";

function StateCardWrapper({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{children}</div>
  );
}

export default StateCardWrapper;
