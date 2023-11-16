'use client';
import {Button, List, ListItem, ListItemText, TextField} from '@mui/material';
import {useRef, useState} from "react";

class CIDR {
    private prefix_len: number;
    private addr_num: number;
    private mask_num: number;

    static from_str(s: string) {
        let arr = s.split('/');
        let addr = arr[0];
        let ip_seg = addr.split('.');

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
        let addr = '';
        for (let i = 0; i < seg.length - 1; i++) {
            addr = addr.concat(seg[i].toString(), '.');
        }
        addr = addr.concat(seg[seg.length - 1].toString(), '/', this.prefix_len.toString());
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
            return Array.of(this)
        } else {
            return Array.of(new CIDR(this.prefix_len + 1, this.addr_num), new CIDR(this.prefix_len + 1, this.addr_num | (1 << (32 - (this.prefix_len + 1)))));
        }
    }

    greater(b: CIDR): boolean {
        if (this.prefix_len >= b.prefix_len) return false;
        if ((this.mask_num & b.addr_num) === this.addr_num) return true; else return false;
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
    return (<ListItem key={idx}>
        <ListItemText primary={c.info()}/>
    </ListItem>);
}

export default function Home() {
    const [state, setState] = useState({
        answer: [] as CIDR[]
    });
    const r = useRef({
        input: ''
    })
    return (<div className="flex justify-center p-8">
        <TextField onChange={(e) => {
            r.current.input = e.target.value;
        }}/>
        <Button onClick={() => {
            let OP = r.current.input.split('-');
            if (OP.length <= 1) {
                let new_state = {...state, answer: OP.map((f) => CIDR.from_str(f))};
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
            setState({...state, answer: ans});
        }}>Calculate</Button>
        <List>
            {state.answer.map((e, idx) => RenderCIDR(e, idx))}
        </List>
    </div>);
}
