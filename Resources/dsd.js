export default class dsd {
    constructor(size) {
        this.N = size;
        this.P = new Array(this.N);
        this.R = new Array(this.N);

        this.init = function () {
            for (var i = 0; i < this.N; i++) {
                this.P[i] = i;
                this.R[i] = 0;
            }
        };

        this.union = function (x, y) {
            var u = this.find(x);
            var v = this.find(y);
            if (this.R[u] > this.R[v]) {
                this.R[u] = this.R[v] + 1;
                this.P[u] = v;
            }
            else {
                this.R[v] = this.R[u] + 1;
                this.P[v] = u;
            }
        };

        this.find = function (x) {
            if (x == this.P[x])
                return x;
            this.P[x] = this.find(this.P[x]);
            return this.P[x];
        };
    }
}
