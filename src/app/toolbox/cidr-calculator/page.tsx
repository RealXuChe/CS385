"use client";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  List,
} from "@mui/material";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck"; // Import an icon
import { useRef, useState, useEffect } from "react";

class CIDR {
  private prefix_len: number;
  private addr_num: number;
  private mask_num: number;

  static from_str(s: string) {
    let arr = s.split("/");
    let addr = arr[0];
    let ip_seg = addr.split(".");

    let prefix_len = parseInt(arr[1]);

    let addr_pfx = 0;
    for (let i = 0; i < 4; i++) {
      addr_pfx <<= 8;
      addr_pfx += parseInt(ip_seg[i]);
    }
    addr_pfx >>= 32 - prefix_len;
    addr_pfx <<= 32 - prefix_len;
    return new CIDR(prefix_len, addr_pfx);
  }

  /**
   * Construct
   *
   * @param {number} pl - prefix length
   * @param {number} pf - address prefix*/
  constructor(pl: number, pf: number) {
    this.prefix_len = pl;

    this.addr_num = pf;

    this.mask_num = 0;
    for (let i = 0; i < this.prefix_len; i++) {
      this.mask_num |= 1 << i;
    }
    this.mask_num <<= 32 - this.prefix_len;
  }

  info() {
    let seg = [];
    let bin_repr = this.addr_num;
    for (let i = 0; i < 4; i++) {
      seg.push(bin_repr % (1 << 8));
      bin_repr >>= 8;
    }
    seg.reverse();
    for (var i = 0; i < seg.length; ++i) {
      if (seg[i] < 0) seg[i] *= -1;
    }
    let addr = "";
    for (let i = 0; i < seg.length - 1; i++) {
      addr = addr.concat(seg[i].toString(), ".");
    }
    addr = addr.concat(
      seg[seg.length - 1].toString(),
      "/",
      this.prefix_len.toString(),
    );
    return addr;
  }

  subtract(b: CIDR): CIDR[] {
    if (!this.common(b)) return Array.of(this);
    if (!this.greater(b)) {
      return Array.of();
    }
    let sub = this.bisect();
    let ans: CIDR[] = [];
    for (let i = 0; i < sub.length; i++) {
      ans = ans.concat(sub[i].subtract(b));
    }
    return ans;
  }

  bisect(): CIDR[] {
    if (this.prefix_len === 32) {
      return Array.of(this);
    } else {
      return Array.of(
        new CIDR(this.prefix_len + 1, this.addr_num),
        new CIDR(
          this.prefix_len + 1,
          this.addr_num | (1 << (32 - (this.prefix_len + 1))),
        ),
      );
    }
  }

  greater(b: CIDR): boolean {
    if (this.prefix_len >= b.prefix_len) return false;
    if ((this.mask_num & b.addr_num) === this.addr_num) return true;
    else return false;
  }

  equals(b: CIDR) {
    return this.addr_num === b.addr_num && this.prefix_len === b.prefix_len;
  }

  /**
   * If the two segments covers some address in common
   */
  common(b: CIDR): boolean {
    return this.equals(b) || this.greater(b) || b.greater(this);
  }
}

function RenderCIDR(c: CIDR, idx: number) {
  return (
    <div key={idx}>
      <ListItem
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.04)", // Light background
          margin: "5px",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)", // Darker on hover
          },
        }}
      >
        <ListItemIcon>
          <NetworkCheckIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {c.info()}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

export default function Home() {
  const [state, setState] = useState({ answer: [] as CIDR[] });
  const inputRef = useRef("");

  const handleCalculate = () => {
    let OP = inputRef.current.split("-");
    saveHistory(inputRef.current);
    if (OP.length <= 1) {
      let new_state = { ...state, answer: OP.map((f) => CIDR.from_str(f)) };
      setState(new_state);
      return;
    }
    let ans = [CIDR.from_str(OP[0])];
    for (let i = 1; i < OP.length; i++) {
      let b = CIDR.from_str(OP[i]);
      let next: CIDR[] = [];
      for (let j = 0; j < ans.length; j++) {
        next = next.concat(ans[j].subtract(b));
      }
      ans = next;
    }
    setState({ ...state, answer: ans });
  };

  const formatDate = (date: Date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  };
  const saveHistory = (text: string) => {
    const toolName = "cidr-calculator";
    let rawInfo = localStorage.getItem(toolName);
    if (rawInfo == null) {
      let newInfo = {
        query: [text],
        time: [formatDate(new Date())],
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    } else {
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      let nowQuery = text;
      let nowTime = formatDate(new Date());
      queries.push(nowQuery);
      times.push(nowTime);
      let newInfo = {
        query: queries,
        time: times,
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    }
  };

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      inputRef.current = history;
      setInputValue(history);
      handleCalculate();
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h6" textAlign="center">
            CIDR Calculator
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Enter CIDR Range"
            // placeholder="127.0.0.1/20"
            variant="outlined"
            value={inputValue}
            onChange={(e) => (
              (inputRef.current = e.target.value), setInputValue(e.target.value)
            )}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: "rgb(124,104,243)", color: "white" }}
            onClick={handleCalculate}
          >
            Calculate
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ maxWidth: "600px", margin: "auto" }}>
            {" "}
            {/* Centering and limiting width */}
            <List>{state.answer.map((e, idx) => RenderCIDR(e, idx))}</List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
